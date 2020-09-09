import React, { Component } from 'react'
import './CSS/Test.css';
import {SUBJECTS} from '../shared/subjects';
import {Link} from 'react-router-dom';

export class TestComponent extends Component {
      render() {
            const displaysubject=SUBJECTS.map((subject)=>{
                  return (
                       
                        <Link className="link" to={`/test/${subject.name}`}>
                        <div className="t-subject" style={{backgroundColor:subject.col}}> 
                              <h3>{subject.name.toUpperCase()}</h3>
                        </div>
                        </Link>
                      
                  );
            })
            return (
                  <div className="comp">
                  <div className="t-test">
                        {displaysubject}
                  </div>
                  </div>
            )
      }
}

export default TestComponent





