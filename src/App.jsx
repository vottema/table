import { useState } from 'react';
import data from './ForTable.json'
function App() {

  const [info, setInfo] = useState(data)
  const [status, setStatus] = useState(false)
  info.map(el => {
    el.pay_status = String(el.pay_status)
    return el
  })
  const add = (event) => {
    event.preventDefault()
    const id = info.length + 20
    const newInfo = {
      id,
      first_name: event.target.first.value,
      last_name: event.target.last_name.value,
      username: event.target.username.value,
      email: event.target.email.value,
      pay_status: event.target.pay_status.value,
      profile_link: event.target.profile_link.value
    }
    setInfo([...info, newInfo])
    document.forms.form.reset()
  }

  const sort = (event) => {
    const tag = event.target.id
    if (status === false) {
      const sort = info.sort(function (a, b) {
        if (a[tag] > b[tag]) {
          return 1;
        }
        if (a[tag] < b[tag]) {
          return -1;
        }
        return 0;
      });
      setInfo(sort)
      setStatus((prev) => !prev)
    } else {
      const sort = info.sort(function (a, b) {
        if (a[tag] > b[tag]) {
          return -1;
        }
        if (a[tag] < b[tag]) {
          return 1;
        }
        return 0;
      });
      setInfo(sort)
      setStatus((prev) => !prev)
    }
  }

  function tableSearch() {
    const phrase = document.getElementById('search-text');
    const table = document.getElementById('info-table');
    let regPhrase = new RegExp(phrase.value, 'i');
    let flag = false;
    for (let i = 1; i < table.rows.length; i++) {
      flag = false;
      for (let j = table.rows[i].cells.length - 1; j >= 0; j--) {
        flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
        if (flag) break;
      }
      if (flag) {
        table.rows[i].style.display = "";
      } else {
        table.rows[i].style.display = "none";
      }

    }
  }

  return (
    <div className="App">
      <input className="form-control" onKeyUp={tableSearch} type="text" placeholder="Поиск по таблице" id="search-text" />
      <table id='info-table' className="table table-dark table-hover">
        <thead>
          <tr>
            <th id='id' style={{ cursor: 'pointer' }} scope="col" onClick={sort}># ⬍</th>
            <th id='first_name' style={{ cursor: 'pointer' }} scope="col" onClick={sort}>first_name ⬍</th>
            <th id='last_name' style={{ cursor: 'pointer' }} scope="col" onClick={sort}>last_name ⬍</th>
            <th id='username' style={{ cursor: 'pointer' }} scope="col" onClick={sort}>username ⬍</th>
            <th id='email' style={{ cursor: 'pointer' }} scope="col" onClick={sort}>email ⬍</th>
            <th id='pay_status' style={{ cursor: 'pointer' }} scope="col" onClick={sort}>pay_status ⬍</th>
            <th id='profile_link' style={{ cursor: 'pointer' }} scope="col" onClick={sort}>profile_link ⬍</th>
          </tr>
        </thead>
        <tbody>
          {info.map(el =>
            <tr key={el.id}>
              <th scope="row">{el.id}</th>
              <td>{el.first_name}</td>
              <td>{el.last_name}</td>
              <td>{el.username}</td>
              <td>{el.email}</td>
              <td>{el.pay_status}</td>
              <td>
                <a href={el.profile_link} rel="noreferrer" target="_blank">{el.profile_link}</a>
              </td>
            </tr>
          )}

        </tbody>
      </table>
      <form name='form' onSubmit={add}>
        <div className="input-group mb-3">
          <input name='first' type="text" className="form-control" placeholder="first_name" />
          <input name='last_name' type="text" className="form-control" placeholder="last_name" />
          <input name='username' type="text" className="form-control" placeholder="username" />
          <input name='email' type="text" className="form-control" placeholder="email" />
          <input name='pay_status' type="text" className="form-control" placeholder="pay_status" />
          <input name='profile_link' type="text" className="form-control" placeholder="profile_link" />
        </div>
        <center>
          <button type="submit" className="btn btn-dark">Добавить</button>
        </center>
      </form>
    </div>
  );
}

export default App;

