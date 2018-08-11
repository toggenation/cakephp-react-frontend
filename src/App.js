import React, { Component } from 'react';
import qs from 'qs';
import { withCookies, Cookies } from 'react-cookie';
class App extends Component {

  constructor(props) {
    super(props)

    const { cookies } = props
    console.log('COOKIES', cookies.getAll());
    this.state = { csrfToken: cookies.get('csrfToken') }
  }
  componentDidMount() {
    const { cookies } = this.props
    console.log('COOKIES', cookies.get('csrfToken'));
    this.state = { csrfToken: cookies.get('csrfToken') }


  }

  sendFetch(method = 'GET', options = {}) {
    return fetch('http://cake.tgn/articles',
    {
      method: method,
      mode: 'cors',
      credentials: "include",
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error(response.status + " james has an error " + response.statusText)
    }).catch((e) => {
      console.log(e)
    })
}

componentWillMount(){
  this.sendFetch().then((data) => {
    console.log('STATE', this.state)
    this.setState({
      ...this.state,
      ...data
    })
    console.log(this.state)
  })
}
render() {



  const { articles, csrfToken } = this.state
  console.log("CSRF", csrfToken)

  return (
    <div className="App" style={{ margin: '0px 200px' }}>
      <header className="App-header">
        <h1 className="App-title">Embedded React Test</h1>
      </header>
      <h4>data from cakephp</h4>
      {articles &&
        <dl>
          {articles.map((item) => {

            const id = item.id
            return <div key={id+ 'div'}>
                        <dt 
                          style={ { cursor: 'pointer'}}
                          onClick={ () => {
                              fetch('http://cake.tgn/articles/' + id,
                              {
                                method: 'DELETE',
                                mode: 'cors',
                                credentials: "include",
                                headers: {
                                  'X-Requested-With': 'XMLHttpRequest',
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json'
                                }
                              }).then((response) => {
                                if (response.ok) {
                                  return response.json()
                                }
                                throw new Error(response.status + " james has an error " + response.statusText)
                              })
                              .then((result)=> {
                                this.sendFetch().then((data) => {
                                  console.log('STATE', this.state)
                                  this.setState({
                                    ...this.state,
                                    ...data
                                  })
                                  console.log(this.state)
                                })
                                
                                console.log(result)})
                              .catch((e) => {
                                console.log(e)
                              })
                          
                          }}
                        key={id}>{item.title}</dt>
                    <dd key={id + 'dd'}>{item.body}</dd></div>
          })}
        </dl>}

      <form
        onSubmit={(e, csrfToken) => {
          e.preventDefault()
          fetch('http://cake.tgn/articles',
            {
              mode: 'cors',
              method: 'POST',
              cache: 'no-cache',
              credentials: "include",
              headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                user_id: 1,
                title: e.target.elements.title.value,
                body: e.target.elements.body.value,
                anotherValue: 'hi'
              }),
            }
          ).then((response) => {
            if (response.ok) {
              
                this.sendFetch().then((data) => {
                  console.log('STATE', this.state)
                  this.setState({
                    ...this.state,
                    ...data
                  })
                  console.log(this.state)
                })
              return response.json()

            }
            throw new Error(response.status + "HI" + response.statusText)
          }).catch((e) => console.log(e))

          console.log(e.target.elements.title.value)
          console.log(e.target.elements.body.value)
          console.log(e)
          e.target.reset();
        }
        }
      >
        Title: <input name="title" /> <br />
        Body: <input name="body" /> <br />
        <button type="submit">Submit</button>
      </form>


    </div>
  );
}
}

export default withCookies(App);
