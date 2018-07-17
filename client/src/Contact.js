import React, { Component } from "react";
export default class Contact extends Component { 
  dev = [
        {
            id: 'anthony',
            name: 'Anthony Catalfo',
            email: 'nagubalpngnysbBlnubbApbz',
            picture: 'https://ca.slack-edge.com/T4JUEB3ME-U8CBJCJ7K-d19907ad71bb-72'
        },
        {
            id: 'peter',
            name: 'Peter Grey',
            email: 'crgreterlBlnubbApbz',
            picture: 'https://ca.slack-edge.com/T4JUEB3ME-U7P5N0KEC-5c660ff183b4-48'
        },
        {
            id: 'richard',
            name: 'Richard Reis',
            email: 'evpuneqervfBlnubbApbz',
            picture: 'https://ca.slack-edge.com/T4JUEB3ME-U7J9CUMU2-2749fb51b912-48'
        },
        {
            id: 'igor',
            name: 'Igor Yermak',
            email: 'vtbelreznxBlnubbApbz',
            picture: 'https://ca.slack-edge.com/T4JUEB3ME-U6PLJKDC1-9f8ccee199de-48'
        },

    ]

  render() {
    return (
      <div id="contact">
        {this.dev.map(character => (
                 
               
                    <li>{character.name}</li>
                    <li><img width={120} height={80} src={character.picture}/></li>
                    <li>Email: {this.cipher(character.email)}</li>
       
      </div>
    );
  }
}