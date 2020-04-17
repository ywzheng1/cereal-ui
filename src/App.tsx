import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

import './App.scss';


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
			<Menu defaultIndex={0}>
				<MenuItem index={0}>cool link</MenuItem>
				<MenuItem index={1} disabled>cool link 2</MenuItem>
				<MenuItem index={2}>cool link 3</MenuItem>
			</Menu>

			<Menu defaultIndex={0} mode="vertical">
				<MenuItem index={0}>cool link</MenuItem>
				<MenuItem index={1} disabled>cool link 2</MenuItem>
				<MenuItem index={2}>cool link 3</MenuItem>
			</Menu>
		</div>
	</div>
  );
}

export default App;
