import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert';


function App() {

  return (
    <div className="App">

        <Button> Normal </Button>
        <Button disabled> Disabled </Button>
        <Button btnType={ButtonType.Danger}> Danger </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> Large Button </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Small}> Small Button </Button>
        <Button btnType={ButtonType.Link} href="https://www.google.com/"> Link Button </Button>
        <Button btnType={ButtonType.Link} href="https://www.google.com/" disabled> Disabled Link </Button>
 
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
  );
}

export default App;
