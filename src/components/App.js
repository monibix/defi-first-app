import React, {Component} from 'react';
import Navbar from './Navbar';
import Web3 from 'web3';

class App extends Component {
    
    

    async UNSAFE_componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }
    //this async function connects the app to the blockchain
    async loadWeb3() {

        console.log("window.eteherem", window)

        if(window.ethereum) {
            console.log("first if")
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non ethereum browser detected. You should consider Metamask!')
        }
      }

    async loadBlockchainData() {
        const web3 = window.web3
        const account = await web3.eth.requestAccounts()
        this.setState({account: account[0]})
        console.log(account)
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '0x0', 
            // contracts as objects
            tether: {}, 
            rwd: {}, 
            decentralBank: {},
            tetherBalance: '0',
            rwdBalance: '0', 
            stakingBalance: '0', 
            loading: true //for a better UX 
        }
    }

    render() {
        return (
            <div>
                <Navbar account={this.state.account}></Navbar>
            </div>
        )
    }
}

export default App;
