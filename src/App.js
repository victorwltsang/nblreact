import React, { Component } from 'react';
import './App.css';
import Modal from './components/UI/Modal/Modal';

class App extends Component {

  state = {
    events: null,
    dataRoute: 'https://nblreact.wpengine.com/wp-json/acf/v3/event',
    modalTrigger:null,
    modalToggle:false
  }

  async componentDidMount() {
    const response = await fetch(this.state.dataRoute,{});
    const json = await response.json();

    console.log(json);
    console.log(Object.values(json));

    let myEvent = json.map((day, i) => {
      let daysArr = day.acf.day;
      let agendas = day.acf.agenda.map(agenda => {
        let sessions = agenda.acf.session.map(session => {
          let session_speakers = session.acf.session_speakers.map(speaker => {
            return { ...speaker.acf }
          });
          return {
            session_title: session.acf.session_title,
            session_abstract: session.acf.session_abstract,
            session_speakers: session_speakers
          }
        });

        return {
          "time": agenda.acf.time,
          "session": sessions
        }
      });

      let myDay = daysArr.split("-");

      let agendaDay = "day" + myDay[myDay.length - 1];

      return {
        [agendaDay]: agendas
      }
    });
    
    let mergedEvents = Object.assign(...myEvent);
    console.log(mergedEvents);
    this.setState({
      events: mergedEvents
    });

  }

  componentDidUpdate() {
    console.log('hi');
  }

  showModalHandler = (abstract) =>{
    console.log(abstract);
    this.setState({
      modalTrigger: abstract,
      modalToggle: true
    })
  }

  closeModalHandler = () =>{
    this.setState({
      modalTrigger: null,
      modalToggle: false
    })
  }

  render() {
    console.log(this.state.events);
    if (this.state.events) {
      var agendas = this.state.events.day1.map(agenda => {
        console.log(agenda);

        return (

          <div className="agenda-item agenda-item-cp" key={agenda.time}>
            <div className="agenda-item-time">{agenda.time}</div>
            <div className="agenda-item-desc">
              {agenda.session.map(session => {
                return (
                  <div className="agenda-item-desc-title" key={session.session_title}>
                    <p>{session.session_title}</p>
                    <span onClick={() => this.showModalHandler(session.session_title)}><img className="show-bio agenda-expand-nba" src="http://www.netbaselive.com/wp-content/uploads/2017/06/dropdown.svg" width="17" height="9" /></span>
                    <Modal show={this.state.modalToggle} modalTrigger={this.state.modalTrigger} target={session.session_title} closeModal={this.closeModalHandler}>
                      {session.session_speakers.map((speaker, i) => {
                        return (
                          <div key={speaker.name + i}>
                            <img src={speaker.headshot} alt={speaker.name}/>
                            <p>{speaker.name}, {speaker.company_title}, {speaker.company}</p>

                          </div>
                        )
                      })}
                    <p><strong>Abstract: </strong>{session.session_abstract}</p>
                    </Modal>
                    {session.session_speakers.map((speaker, i) => {
                      return (
                        <div key={speaker.name + i}>
                          <p>{speaker.name}, {speaker.company_title}, {speaker.company}</p>

                        </div>
                      )
                    })}
                  </div>
                )

              })}
            </div>
          </div>
        )
      });

      console.log(agendas);

    }

    return (
      <div className="App">
        {agendas}
      </div>
    );
  }
}

export default App;
