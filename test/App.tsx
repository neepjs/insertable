import Neep from '@neep/core';
import Insertable from '@neep/insertable';
// 1. 定义组件。
// 可以从其他文件 import 进来
const Com1 = Neep.createComponent((props: any, {emit}) =>
<div on-click={() => emit('click', '666')}>
	{props.customAttribute}组件1
</div>, {name: 'Com1'});
const Com2 = Neep.createComponent(() => <div>组件2</div>, {name: 'Com2'});
const Com3 = Neep.createComponent(() => <div>组件3</div>, {name: 'Com3'});

// 2. 创建 insertable 实例
const insertable = new Insertable();

// 3. 添加组件
insertable.add('insert1', Com1);
insertable.add('insert1', Com2);
// 同一组件组件在同一名称下注册多次，将会被渲染多次
insertable.add('insert1', Com1);

insertable.add('insert2', Com3);
insertable.add('insert2', Com2);
insertable.add('insert2', Com1);
// 普通的 html 标签也支持
insertable.add('insert2', 'div');

(window as any).insertable = insertable;

export default <insertable.view>
	{/* 使用 insert-view 组件在插入注册的组件 */}
	{/* name 为注册的名称 */}
	{/* <insert-view /> 会渲染出指定注册名的所有组件 */}
	{/* <insert-view /> 会将属性及事件传递给组件 */}
	<Insertable.View name="insert1" customAttribute="myValue" />
	{/* 渲染结果同下： */}
	{/* <Com1 name="insert1" customAttribute="myValue" /> */}
	{/* <Com2 name="insert1" customAttribute="myValue" /> */}
	{/* <Com1 name="insert1" customAttribute="myValue" /> */}
	{/* 同一组件组件在同一名称下注册多次，将会被渲染多次 */}

	<hr />

	<Insertable.View name="insert2" customAttribute="myValue" />
	{/* 渲染结果同下： */}
	{/* <Com3 name="insert2" customAttribute="myValue" /> */}
	{/* <Com2 name="insert2" customAttribute="myValue" /> */}
	{/* <Com1 name="insert2" customAttribute="myValue" /> */}
	{/* <div name="insert2" customAttribute="myValue" /> */}
	{/* 普通的 html 标签也支持 */}

	<hr />

	{/* <insert-view /> 如果被引入多次将会被渲染多次，，即便 name 相同 */}
	<Insertable.View name="insert1" />
	{/* 渲染结果同下： */}
	{/* <Com1 name="insert1" /> */}
	{/* <Com2 name="insert1" /> */}
	{/* <Com1 name="insert1" /> */}
</insertable.view>;
