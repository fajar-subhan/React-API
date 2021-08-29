import axios from 'axios';
import React, { Component, Fragment } from 'react';
import Header from './component/header/Header';
import List from './component/view_list/List';


export default class App extends Component {
 constructor(props)
 {
   super(props);

   this.state = {
      data : [],
      form : {
        id      : 1,
        title   : '',
        body    : '',
        userId  : 1
      },
      isUpdate  : false
   }
 }

  /**
  * Get data API with json-server and axios.
  * Runs on local server
  * 
  * @link      : https://github.com/typicode/json-server
  * @link      : https://github.com/axios/axios 
  * @license   : MIT License
  * @method    : GET
  * @resources : http://localhost:3001/posts
  */
  getDataAPI() {
    axios.get('http://localhost:3001/posts?_sort=id&_order=desc')
    .then((e) => {
      this.setState({
        data : e.data
      })
    })
  }

  /** 
   * Show API data after component finished installing
   * 
  */
  componentDidMount() {
    this.getDataAPI();
  }

  /**
   * Delete data with the id of each component.
   * Use json-server and axios 
   * 
   * @link      : https://github.com/typicode/json-server
   * @link      : https://github.com/axios/axios 
   * @license   : MIT License
   * @method    : DELETE
   * @resources : http://localhost:3001/posts/id 
   * @param {*} id 
   */
  handleRemove(id) {
    axios.delete('http://localhost:3001/posts/' + id)
    .then(() => {
      this.getDataAPI();
    })
  }

  /**
   * Ambil data dari API berdasarkan id.
   * Use json-server and axios 
   * 
   * @link      : https://github.com/typicode/json-server
   * @link      : https://github.com/axios/axios 
   * @license   : MIT License
   * @method    : GET
   * @resources : http://localhost:3001/posts/id 
   * @param {*} id 
   */
  getDataApiByID(id) {
      axios.get('http://localhost:3001/posts/' + id)
      .then((e) => {
        this.setState({
          isUpdate : true, 
          form     : e.data
        })
      })
  } 

  /**
   * Update API data
   * Use json-server and axios 
   * 
   * @link      : https://github.com/typicode/json-server
   * @link      : https://github.com/axios/axios 
   * @license   : MIT License
   * @method    : PUT
   * @resources : http://localhost:3001/posts/id 
   * @param {*} id 
   */
  handleProsesUpdate(id)
  {
    axios.put('http://localhost:3001/posts/' + id,this.state.form)
    .then(() => {
      this.getDataAPI();
      this.setState({
        isUpdate : false,
        form : {
          id      : 1,
          title   : '',
          body    : '',
          userId  : 1
        } 
      })
    })
  }


  /**
   * Process new data and updated data
   * 
   * @param {*} e
   */
  handleProses = (e) => {
    if(this.state.isUpdate)
    {
      this.handleProsesUpdate(this.state.form.id);
    }
    else 
    {
      this.handleProsesAdd();
    }

    e.preventDefault();
  }

  /**
   * Adding API data
   * Use json-server and axios 
   * 
   * @link      : https://github.com/typicode/json-server
   * @link      : https://github.com/axios/axios 
   * @license   : MIT License
   * @method    : POST
   * @resources : http://localhost:3001/posts
   */
  handleProsesAdd()
  {
    axios.post(' http://localhost:3001/posts',this.state.form)
    .then(() => {
      this.setState({
        form : {
          id      : 1,
          title   : '',
          body    : '',
          userId  : 1
        } 
      })
      this.getDataAPI();
    })
  }

  /**
   * Take data from input, to add and update API data
   * 
   * @param {*} data
   */
  handleInput = (data) => {
    let formData = {...this.state.form};
    formData[data.target.name] = data.target.value;

    /* If the data is not updated, then the id value must be unique */
    if(!this.state.isUpdate)
    {
      formData['id'] = new Date().getTime();
    }

    this.setState({
      form : formData
    })

  }  
  

  render() {
    return (
      <Fragment>
        <Header />
        <hr />
        <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4 mt-3">
                    <div className="card border-primary mb-3">
                        <div className="card-header">Form API</div>
                        <div className="card-body text-primary">
                            <form onSubmit={(e) => this.handleProses(e)}>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" onChange={this.handleInput} value={this.state.form.title} name="title" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Body Content</label>
                                    <textarea className="form-control" onChange={this.handleInput} value={this.state.form.body}  name="body" rows="5" cols="10">
                                    
                                    </textarea>
                                </div>

                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        <hr />
        <div className="header text-center mb-4">
          <h4>List Data API</h4>
        </div>
      {
        this.state.data.map((e) => {
          return <List 
            key={e.id} 
            data={e} 
            handleRemove={(e) => this.handleRemove(e)}
            getDataByID={(e) => this.getDataApiByID(e)}/>
        })
      }
      </Fragment>
    );
  }
}