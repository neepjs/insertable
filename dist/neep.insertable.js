/*!
 * NeepInsertable v0.1.0-alpha.3
 * (c) 2020-2021 Fierflame
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

let InsertableDeliver;
function initDelivers() {
  InsertableDeliver = core.createDeliverComponent();
}

function initWith() {
  exports.withInsertable = core.createWith({
    name: 'withInsertable',

    create() {
      return core.withDelivered(InsertableDeliver);
    }

  });
}

function InsertViewFn(props, {
  childNodes
}) {
  const {
    name
  } = props;

  if (typeof name !== 'string') {
    const {
      insertable
    } = props;

    if (insertable instanceof Insertable) {
      return core.createElement(InsertableDeliver, {
        value: insertable
      }, ...childNodes());
    }

    return core.createTemplateElement(childNodes());
  }

  const {
    insertable
  } = props;

  if (insertable instanceof Insertable) {
    const list = insertable.get(name);

    if (!list) {
      return null;
    }

    return core.createElement(InsertableDeliver, {
      value: insertable
    }, list.map(t => core.createElement(t.component, props, ...childNodes())));
  }

  const contextInsertable = exports.withInsertable();

  if (!contextInsertable) {
    return core.createTemplateElement(childNodes);
  }

  const list = contextInsertable.get(name);

  if (!list) {
    return null;
  }

  return core.createTemplateElement(list.map(t => core.createElement(t.component, props, ...childNodes())));
}

function initComponents() {
  exports.View = core.createShellComponent(InsertViewFn, {
    name: 'InsertView'
  });
}

function installComponents() {
  core.register('InsertView', exports.View);
  core.register('insert-view', exports.View);
}

var moduleList = [initDelivers, initComponents, installComponents, initWith];

function install(Neep) {}

for (const f of moduleList) {
  f();
}

const version = '0.1.0-alpha.3';

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
    const view = core.createShellComponent((props, ...p) => InsertViewFn({ ...props,
      insertable: this
    }, ...p), {
      name: 'Insertable'
    });
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
    return exports.View;
  }

  static get version() {
    return version;
  }

}

exports.InsertView = exports.View;
exports.default = Insertable;
exports.install = install;
exports.version = version;
