/*!
 * NeepInsertable v0.1.0-alpha.0
 * (c) 2020 Fierflame
 * @license MIT
 */
'use strict';

var core = require('@neep/core');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function contextConstructor(context) {
  Reflect.defineProperty(context, 'insertable', {
    value: context.delivered.__NeepInsertable__,
    enumerable: true,
    configurable: true
  });
}

function installContextConstructor() {
  core.addContextConstructor(contextConstructor);
}

function InsertView(props, {
  insertable: contextInsertable,
  childNodes
}, {
  createElement,
  Deliver
}) {
  const {
    name,
    insertable
  } = props;

  if (!name && insertable instanceof Insertable) {
    return createElement(Deliver, {
      __NeepInsertable__: insertable
    }, ...childNodes);
  }

  if (!name) {
    return childNodes;
  }

  if (insertable instanceof Insertable) {
    const list = insertable.get(name);

    if (!list) {
      return null;
    }

    return createElement(Deliver, {
      __NeepInsertable__: insertable
    }, list.map(t => createElement(t.component, props, ...childNodes)));
  }

  if (!(contextInsertable instanceof Insertable)) {
    return childNodes;
  }

  const list = contextInsertable.get(name);

  if (!list) {
    return null;
  }

  return list.map(t => createElement(t.component, props, ...childNodes));
}
core.mSimple(InsertView);
core.mName('InsertView', InsertView);

function installComponents() {
  core.register('InsertView', InsertView);
  core.register('insert-view', InsertView);
}

function install(Neep) {}
installComponents();
installContextConstructor();

class Insertable {
  constructor(parent) {
    _defineProperty(this, "parent", void 0);

    _defineProperty(this, "_groups", core.encase(Object.create(null)));

    if (parent instanceof Insertable) {
      this.parent = parent;
    }
  }

  add(name, components, info = {}) {
    if (typeof info === 'number') {
      info = {
        order: info
      };
    }

    const groups = this._groups;

    if (!Array.isArray(components)) {
      components = [components];
    }

    const list = groups[name] ? [...groups[name]] : [];
    list.push(...components.map(component => Object.freeze({ ...info,
      component
    })));
    list.sort(({
      order: a
    }, {
      order: b
    }) => (a || 0) - (b || 0));
    groups[name] = list;
  }

  remove(name, component) {
    const groups = this._groups;
    const oldList = groups[name];

    if (!oldList) {
      return;
    }

    if (!component) {
      groups[name] = [];
      return;
    }

    const k = oldList.findIndex(t => t.component === component);

    if (k < 0) {
      return;
    }

    const list = [...oldList.slice(0, k), ...oldList.slice(k + 1)];
    groups[name] = list;
  }

  set(name, components, info = {}) {
    if (typeof info === 'number') {
      info = {
        order: info
      };
    }

    const groups = this._groups;

    if (!Array.isArray(components)) {
      components = [components];
    }

    const list = components.map(component => Object.freeze({ ...info,
      component
    }));
    groups[name] = list;
  }

  get(name, parent) {
    const groups = this._groups;
    const list = groups[name] || [];

    if (!parent || !this.parent) {
      return [...list];
    }

    const parentList = this.parent.get(name, typeof parent === 'number' ? parent - 1 : -1);
    const allList = [...parentList, ...list];

    if (list.length && parentList.length) {
      allList.sort(({
        order: a
      }, {
        order: b
      }) => (a || 0) - (b || 0));
    }

    return allList;
  }

  get view() {
    const view = (props, ...p) => InsertView({ ...props,
      insertable: this
    }, ...p);

    core.mName('Insertable', view);
    Reflect.defineProperty(this, 'view', {
      value: view,
      enumerable: true,
      configurable: true
    });
    return view;
  }

  static get install() {
    return install;
  }

  static get View() {
    return InsertView;
  }

}

_defineProperty(Insertable, "version", '0.1.0-alpha.0');

module.exports = Insertable;
