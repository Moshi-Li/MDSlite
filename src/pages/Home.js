import React from "react";
import '../sass/homePage.scss'



//<p style={{ fontSize: '30px' }}>Thanks for using this App</p>
class Home extends React.Component {
    render() {
        return (
            <div className='home-page'>
                <p style={{ fontSize: '30px' }}>Thanks for using this App</p>
            </div>
        )
    }
}

export default Home