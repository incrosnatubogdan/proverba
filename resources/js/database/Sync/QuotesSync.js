
/**
 * Sync device data from the server.
 *
 * Send the current sites in the list to load the context records related.
 *
 * @emits event on success
 *
 */

import Vue from "vue";
import QuoteTable from "../Models/Quote";

class QuotesSync {
    constructor() {
        this.request = {
            method: 'post',
            url: 'sync-data',
            params: {
                saved_date: localStorage.getItem('last_burial_timestamp') ? localStorage.getItem('last_burial_timestamp') : 0
            }
        }
    }

    async execute() {
        try {
            // QuoteTable.create({
            //     'id': Math.floor(Math.random() * 1245215),
            //     'description': "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            //     'emphasys_description' : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem <p class='emphasys'> Ipsum </p>",
            //     'post_slug': 'Lorem Ipsum',
            //     'seen' : false
            // })
            const localQuotes = await QuoteTable.all();
            const localIDs = localQuotes.map(a => a.id);
            console.log(localQuotes, localIDs, 'all the localQuotes')

            if(localQuotes.length == 0 || this.request.params.saved_date == 0) {
                // Needs replacing with JSON.parse(localStorage.getItem('user_tags'))
                Vue.set(this.request, 'params', {
                    tags: ['first-tag'],
                })
            } else {
                Vue.set(this.request, 'params', {
                    tags: ['first-tag'],
                    localIDs: localIDs
                })
            }
            
            axios(this.request).then(response => {
                let items = response.data.items;
                localStorage.setItem('last_burial_timestamp', response.data.last_save);
                

                items.forEach(async (element) => {
                    let fields = Object();
                    
                    // await StoreRecord(fields, true)
                });
            });
        } catch (e) {
            this.onError(e);
        }
    }

    onSuccess(response) {
        console.log('Burial data is being updated..');
        this.sync(response.data);
    }

    onError(error) {
        console.log(error, 'total altceva');
    }

    sync(data) {
        const pushLookup = {
            lkp_upholstery_preservation: LkpUpholsteryPreservationStorage.set,
        }

        Object.keys(pushLookup).forEach(lookupTable => {
            if (!data[lookupTable]) {
                return;
            }
            try {
                if (data[lookupTable].hasOwnProperty('action')) {
                    delete data[lookupTable].action;
                }

                pushLookup[lookupTable](data[lookupTable]);
            } catch (e) {
                console.log('EXCEPTION WHEN DEVICE DATA SYNC FOR LOOKUP TABLES', e);
            }
        });
        
        console.warn('Device data was updated!!');
    }
}

export default QuotesSync;
