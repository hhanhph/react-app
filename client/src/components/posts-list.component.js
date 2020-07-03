import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.content}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.exercise._id}>edit</Link> | <button onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</button>
      </td>
    </tr>
  )
export default class ExercisesList extends Component{
    constructor(props) {
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = {exercises: []};
      }
      componentDidMount() {
        axios.get('http://localhost:5000/exs/')
         .then(response => {
           this.setState({ exercises: response.data });
         })
         .catch((error) => {
            console.log(error);
         })
      }
      deleteExercise(id) {
        axios.delete('http://localhost:5000/exs/'+id)
          .then(res => console.log(res.data));
        this.setState({
          exercises: this.state.exercises.filter(el => el._id !== id)
        })
      }
      exerciseList() {
        return this.state.exercises.map(currentexercise => {
          return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
      }

    render(){
     
        return(
<div>
  <h3>News Feed</h3>
 
    <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            {this.state.exercises.map((exercise) => {
              return (
                <div className="card my-3">
                  <div className="card-header" style={{fontWeight: "bold"}}>
                    {exercise.username}
                  </div>
                  <div className="card-body">
                    {exercise.content}
                  </div>
                  <div className="card-body">
                    {exercise.date.substring(0,10)}
                  </div>
                  <div className="card-footer">
                    <div className="row">
                    <Link to={"/edit/"+exercise._id} class="card-link" style={{padding:'1em'}}>edit</Link>
              
                      <button onClick={() => { this.deleteExercise(exercise._id) }}>delete</button>
     
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
</div>
        )
    }
}