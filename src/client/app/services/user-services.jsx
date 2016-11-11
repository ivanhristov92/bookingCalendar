'use strict';

import $ from 'jquery';

const UserServices = ( baseUrl ) =>{

    let base = baseUrl;

    let logUser = ( user )=>{

        return new Promise( ( resolve, reject )=>{

            $.ajax({

                method: 'POST',
                url: base + '/api/login',
                data: JSON.stringify( user ),
                contentType: 'application/json',
                success: ( response )=>{
                    resolve ( response )
                }
            });

        });

    };


    let logoutUser = () =>{


        return new Promise( ( resolve, reject )=>{

            $.ajax({

                method: 'GET',
                url: base + '/api/logout',
                success: ( response )=>{
                    return resolve ( response )
                }
            });

        });


    }



    let editUser = ( newUser )=>{

        return new Promise( ( resolve, reject )=>{

            $.ajax({

                method: 'POST',
                url: base + '/api/users/edit',
                contentType: 'application/json',
                data: JSON.stringify( newUser ),
                success: ( response )=>{
                    return resolve ( response )
                }
            });

        });

    }


    return {
        base: base,
        logUser: logUser,
        logoutUser: logoutUser,
        editUser: editUser
    }

}

export default UserServices;