import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tab/tabs';
import TabItem from './components/Tab/tabItem';
import Icon from './components/Icon/icon';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import './App.scss';

library.add(fas)

function App() {

  return (
	<div className='app'>
		<div className='buttons'>
			<h1>Buttons</h1>
			<div className='button-group'>
				<Button btnType={ButtonType.Primary}> Primary </Button>
				<Button> Normal </Button>
				<Button disabled> Disabled </Button>
				<Button btnType={ButtonType.Danger}> Danger </Button>
				<Button btnType={ButtonType.Primary} size={ButtonSize.Large}> Large Button </Button>
				<Button btnType={ButtonType.Primary} size={ButtonSize.Small}> Small </Button>
				<Button btnType={ButtonType.Link} href="https://www.google.com/"> Link Button </Button>
				<Button btnType={ButtonType.Link} href="https://www.google.com/" disabled> Disabled Link </Button>
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
		<div className='icons-section'>
			<Icon icon='coffee' theme='danger' size='2x'/>
			<Icon icon='arrow-down' theme='primary' size='2x'/>
			<Icon icon='book' theme='info' size='2x'/>
		</div>
	</div>
  );
}

export default App;
