import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Devs extends Component {

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

    cipher = str => {
        let arr = str.split('');
        let result = arr.map(function(letter) {
            if (letter.charCodeAt() > 96 && letter.charCodeAt() < 123) {
                if (letter.charCodeAt() > 109) {
                    return String.fromCharCode(letter.charCodeAt() - 13);
                } else {
                    return String.fromCharCode(letter.charCodeAt() + 13);
                }
            }
        
                switch(letter.charCodeAt()) {
            case 65:
                return String.fromCharCode('.'.charCodeAt());
                
            case 66:
                return String.fromCharCode('@'.charCodeAt());
                
            default:
                break;
    
            }
            return letter;
        });
        return result.join('');
    };
    


    render() {
        return(
   
               
            <div className="Devs">
           <span><br/>&nbsp; The Team</span>
                {this.dev.map(d=>
                
                    <div key={d.id}>
                        
                        <span>&nbsp;&nbsp;<img width={120} height={80} src={d.picture}/></span>
                        
                        <span><br/>&nbsp;&nbsp;{d.name} </span>
                        <span><br/>&nbsp;&nbsp;</span>
                        <span>{this.cipher(d.email)}<br/></span>
                        <span>&nbsp;&nbsp;</span>
                        <span>&nbsp;&nbsp;<br/></span>
                    </div>
                )}
                
            </div>

        )
    }}
        

         








export default Devs
