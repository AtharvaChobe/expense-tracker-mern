import React, { useEffect, useState } from 'react'

const App = () => {

  const [name, setname] = useState('');
  const [dateTime, setdateTime] = useState('');
  const [desc, setdesc] = useState('');
  const [Transactions, setTransactions] = useState([]);

  // fetch 
  useEffect(() => {
    getTransaction().then(t => {
      setTransactions(t);
    })
  }, [])

  const getTransaction = async () => {

    const url = import.meta.env.VITE_API + '/all-transactions';
    const res = await fetch(url);
    const jsondata = await res.json();
    return jsondata;
  }



  const price = name.split(' ')[0];

  const addTransaction = (e) => {
    e.preventDefault()
    if (!name || !desc || !dateTime) {
      alert("all fields are compulsory")
    }
    else {
      const url = import.meta.env.VITE_API + '/transaction';
      // console.log(url);
      fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          name: name.substring(price.length + 1),
          price,
          desc,
          dateTime
        })
      }).then(response => {
        response.json().then(json => {

          console.log('result', json);
          setTransactions(prevTransactions => [...prevTransactions, json]);
        })
      })
      setname('');
      setdesc('');
      setdateTime('');
    }
  }

  let balance = 0;

  for (const t of Transactions) {
    balance += t.price;
  }

  return (
    <div className='flex flex-col justify-center items-center h-[100vh] w-full bg-slate-800'>
      <h1 className='font-bold text-4xl'>Total Amount:${balance} <span></span></h1>

      <form onSubmit={addTransaction} className='bg-slate-400 p-4 rounded-md flex flex-col items-center shadow-md justify-center gap-4'>
        <div className='flex gap-3 flex-wrap'>
          <input value={name} onChange={e => setname(e.target.value)} className='text-black shadow-md px-2 py-1 text-lg rounded' type="text" placeholder='expense' />
          <input value={dateTime} onChange={e => setdateTime(e.target.value)} className='shadow-md px-2 py-1 text-lg rounded text-black' type="datetime-local" name="" id="" />
        </div>

        <div className='w-full'>
          <input value={desc} onChange={e => setdesc(e.target.value)} type="text" className='text-black shadow-md w-full px-2 py-1 text-lg rounded' placeholder='description' />
        </div>

        <button className='shadow-md bg-slate-800 px-3 py-2 font-bold w-full rounded-md hover:bg-slate-600' type='submit'>Add</button>

      </form>

      {/* transactions */}

      <div className='flex items-center h-60 overflow-y-auto flex-col justify-between w-1/2 bg-slate-900 p-4 rounded-md mt-10'>

        {
          Transactions.length > 0 && Transactions.slice().reverse().map(t => (
            <div key={t._id} className='py-3 border-blue-200 border-b-2 flex items-center justify-between w-full'>


              {/* left */}
              <div className="left ">
                <div className='text-2xl font-bold'>{t.name}</div>
                <div className='text-sm text-slate-100'>{t.desc}</div>
              </div>


              {/* right */}
              <div className="right">
                <div className={"text-2xl font-bold " + (t.price < 0 ? "text-red-500" : "text-green-500")}>{t.price}$</div>
                <div className='text-sm text-slate-100'>{t.dateTime}</div>
              </div>


            </div>
          ))
        }



      </div>
    </div>
  )
}

export default App