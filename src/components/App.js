import React, {Component} from 'react';
import Navbar from './Navbar';
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json';
import RWD from '../truffle_abis/RWD.json';
import DecentralBank from '../truffle_abis/DecentralBank.json';
import Main from './Main';

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
        const networkId = await web3.eth.net.getId()
        //Load Tether Contract
        let tetherData = Tether.networks[networkId]
        console.log("tetherData", tetherData)
        if (tetherData) {
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address)
            this.setState({tether: tether})
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call()
            this.setState({tetherBalance: tetherBalance.toString()})
        } else  {
            window.alert('Error! Tether contract not deployed - no detected network!')
        }
        //Load RWD Contract
        let rwdData = RWD.networks[networkId]
        if (rwdData) {
            const rwd = new web3.eth.Contract(RWD.abi, rwdData.address)
            this.setState({rwd: rwd})
            let rwdBalance = await rwd.methods.balanceOf(this.state.account).call()
            this.setState({rwdBalance: rwdBalance.toString()})
        } else  {
            window.alert('Error! RWD contract not deployed - no detected network!')
        }
        //Load DecentralBank Contract
        let decentralBankData = DecentralBank.networks[networkId]
        if (decentralBankData) {
            const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
            this.setState({decentralBank: decentralBank})
            let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call()
            this.setState({stakingBalance: stakingBalance.toString()})
        } else  {
            window.alert('Error! DecentralBank contract not deployed - no detected network!')
        }
        this.setState({loading: false})
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
                <div className="container-fluid mt-5">
                    <div className="row">
                        <main role="main" className="col-lg-12 ml-auto mr-auto" style={{maxWidth: '600px', minHeight: '100vm'}} >
                            <div>
                                <Main />
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
