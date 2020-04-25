import React, { useState } from 'react'
import Button from './components/Button/button'
import Alert, { AlertType } from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Tabs from './components/Tab/tabs'
import TabItem from './components/Tab/tabItem'
import Icon from './components/Icon/icon'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Transition from './components/Transition/transition'
import Input from './components/Input/input'

import './App.scss';

library.add(fas)

function App() {

	const [ show, setShow ] = useState(false)

	return (
		<div className='app'>
			<div className='buttons'>
				<h1>Buttons</h1>
				<div className='button-group'>
					<Button btnType='primary'> Primary </Button>
					<Button> Normal </Button>
					<Button disabled> Disabled </Button>
					<Button btnType='danger'> Danger </Button>
					<Button btnType='primary' size='lg'> Large Button </Button>
					<Button btnType='primary' size='sm'> Small </Button>
					<Button btnType='link' href="https://www.google.com/"> Link Button </Button>
					<Button btnType='link' href="https://www.google.com/" disabled> Disabled Link </Button>
				</div>
			</div>
			<hr />
			<div className='alerts'>
				<h1>Alerts</h1>
				<div className='alert-group'>
					<Alert 
						alertType={AlertType.Default} 
						message="this is alert message"
						closable={true}
					/>

					<Alert 
						alertType={AlertType.Success} 
						message="this is alert message"
						closable={true}
					/>

					<Alert 
						alertType={AlertType.Warning} 
						message="this is alert message"
						closable={true}
					/>

					<Alert 
						alertType={AlertType.Danger} 
						message="this is alert message"
						description='this is a description'
						closable={true}
					/>
				</div>
			</div>
			<hr/>
			<div className='menus'>
				<h1>Menus</h1>
				<Menu defaultIndex='0' onSelect={(index) => alert(index)}>
					<MenuItem>cool link</MenuItem>
					<MenuItem disabled>cool link 2</MenuItem>
					<MenuItem>cool link 3</MenuItem>
				</Menu>

				<Menu defaultIndex='0' onSelect={(index) => alert(index)}>
					<MenuItem>cool link</MenuItem>
					<MenuItem disabled>cool link 2</MenuItem>
					<SubMenu title='dropdown'>
						<MenuItem>dropdown 1</MenuItem>
						<MenuItem>dropdown 2</MenuItem>
						<MenuItem>dropdown 3</MenuItem>
					</SubMenu>
					<MenuItem>cool link 3</MenuItem>
				</Menu>

				<div className='vertical-menus-group'>
					<Menu defaultIndex='0' mode="vertical" onSelect={(index) => alert(index)}>
						<MenuItem>cool link</MenuItem>
						<MenuItem disabled>cool link 2</MenuItem>
						<MenuItem>cool link 3</MenuItem>
					</Menu>
					
					<Menu defaultIndex='0' mode='vertical' onSelect={(index) => alert(index)}>
						<MenuItem>cool link</MenuItem>
						<MenuItem disabled>cool link 2</MenuItem>
						<SubMenu title='dropdown'>
							<MenuItem>dropdown 1</MenuItem>
							<MenuItem>dropdown 2</MenuItem>
							<MenuItem>dropdown 3</MenuItem>
						</SubMenu>
						<MenuItem>cool link 3</MenuItem>
					</Menu>

					<Menu defaultIndex='0' mode='vertical' onSelect={(index) => alert(index)} defaultOpenSubMenus={['2']}>
						<MenuItem>cool link</MenuItem>
						<MenuItem disabled>cool link 2</MenuItem>
						<SubMenu title='dropdown default open'>
							<MenuItem>dropdown 1</MenuItem>
							<MenuItem>dropdown 2</MenuItem>
							<MenuItem>dropdown 3</MenuItem>
						</SubMenu>
						<MenuItem>cool link 3</MenuItem>
					</Menu>
				</div>
			</div>
			<hr/>
			<div className='tabs-section'>
				<h1>Tabs</h1>
				<div className='tabs-section-inner'>
					<Tabs defaultIndex={0}>
						<TabItem label='card1'>this is card one</TabItem>
						<TabItem label='card2'>this is card two</TabItem>
						<TabItem label='card3'>this is card three</TabItem>
					</Tabs>

					<Tabs defaultIndex={0} type='card'>
						<TabItem label='card1'>this is card one</TabItem>
						<TabItem label='card2'>this is card two</TabItem>
						<TabItem label='card3' disabled={true}>this is card three</TabItem>
					</Tabs>
				</div>
			</div>
			<hr/>
			<div className='icons-section'>
				<h1>Icons</h1>
				<Icon icon='coffee' theme='danger' size='2x'/>
				<Icon icon='arrow-down' theme='primary' size='2x'/>
				<Icon icon='book' theme='info' size='2x'/>
			</div>
			<hr/>
			<div>
				<h1>Transition</h1>
				<Button size='sm' onClick={() => {setShow(!show)}}>Toggle</Button>
				<Transition
					in={show}
					timeout={300}
					animation='zoom-in-left'
				>
					<div>
						<p>Some content</p>
						<p>Some content</p>
						<p>Some content</p>
						<p>Some content</p>
						<p>Some content</p>
					</div>
				</Transition>
			</div>
			<hr/>
			<div>
				<h1>Inputs</h1>
				<Input placeholder='placeholder' prepend='$'/>
				<Input placeholder='placeholder' icon='search'/>
				<Input placeholder='placeholder' append='.com'/>
				<Input placeholder='placeholder2' size='sm'/>
				<Input placeholder='placeholder3' disabled={true}/>
			</div>
		</div>
	);
}

export default App;
