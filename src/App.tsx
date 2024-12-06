import { useState, useEffect } from 'react'
import './App.css'
import { publicClient, account, walletClient } from './viemClient.ts'

function App() {
  const [balance, setBalance] = useState<string>('0')
  const [recipient, setRecipient] = useState<string>('')
  const [amount, setAmount] = useState<string>('')

  useEffect(()=>{
    async function fetch(){
      const latestBalance = await publicClient.getBalance({ address : account.address})
    setBalance(latestBalance.toString())
    }
    fetch();
  },[])

  const sendTransaction = async (e: React.FormEvent) => {

    e.preventDefault();
    console.log("amount-->", amount)

    const amountinWei = BigInt(amount)

    console.log("amountinWei-->", amountinWei)

    const txHash = await walletClient.sendTransaction({
      to : recipient,
      value : amountinWei,
    })

    console.log("txhash",txHash)
  }

  return (
    <>
    <div>
    <h1>viem DApp</h1>
      <p>Your address: {account.address}</p>
      <p>Your balance: {balance}  wei</p>
    </div>

    <form onSubmit={sendTransaction}>
      <input type="text"
      placeholder="Recipient address"
      value = {recipient}
      onChange = {(e) => setRecipient(e.target.value)}
      style = {{margin: '10px', padding: '5px', borderRadius: '5px'}}
      />
      <input type="text" 
      placeholder = {amount}
      value = {amount}
      onChange = {(e) => setAmount(e.target.value)}
      style = {{margin: '10px', padding: '5px', borderRadius: '5px'}}

      />
      <button type="submit"> Send </button>
    </form>
      
    </>
  )
}

export default App
