import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    events: null,
    dataRoute: 'https://nblreact.wpengine.com/wp-json/acf/v3/event'
  }

  async componentDidMount() {
    const response = await fetch(this.state.dataRoute);
    const json = await response.json();

    console.log(json);

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

  // <div class="agenda-item agenda-item-cp">
  //   <div class="agenda-item-time">1:15 - 2:15
  //     <div class="agenda-item-stamp">KEYNOTE</div>
  //   </div>

  //   <div class="agenda-item-desc">
  //     <div class="agenda-item-desc-title">
  //       Build Greater Intimacy with Clients and Profit from ROR: Return on Relationship
  //       <span data-target="#kn-ted-modal" data-toggle="modal"><img class="show-bio agenda-expand-nba" src="http://www.netbaselive.com/wp-content/uploads/2017/06/dropdown.svg" width="17" height="9"></span>
  //         <div class="agenda-item-speaker">
  //           <span class="agenda-item-speaker-name">Ted Rubin</span>, Social Marketing Strategist, Keynote Speaker, CMO of Photofy</div>
  //     </div>


  //     </div>

  //   </div>

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
                    <span data-target="#nbas-putting-analysis-modal" data-toggle="modal"><img className="show-bio agenda-expand-nba" src="http://www.netbaselive.com/wp-content/uploads/2017/06/dropdown.svg" width="17" height="9" /></span>
                    <p><strong>Abstract: </strong>{session.session_abstract}</p>
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
