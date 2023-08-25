// eslint-disable-next-line no-unused-vars

const NoteData = [


    // Define your block objects here
    {
        id: "0",
        blocks: [
            {
                type: "header",
                data: {
                    text: "2-day itinerary for experiencing Japanese culture in Tokyo",
                    level: 2
                }
            },
            {
                type: "image",
                data: {
                    url: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                    caption: "Mt. Fuji, Japan",
                    stretched: false,
                    withBorder: false
                }
            },

            {
                type: "paragraph",
                data: {
                    text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."
                }
            },

            {
                type: "list",
                data: {
                    items: [
                        "It is a block-style editor",
                        "It returns clean data output in JSON",
                        "Designed to be extendable and pluggable with a simple API"
                    ],
                    style: "unordered"
                }
            },

            {
                type: "paragraph",
                data: {
                    text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."
                }
            }]
    },

    {
        id: "1",
        blocks: [{
            type: "header",
            data: {
                text: "Explore local culinary in Spain",
                level: 2
            }
        },
        {
            type: "image",
            data: {
                url: "https://images.unsplash.com/photo-1586724832670-3b5ddb084c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhcmNlbG9uYSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
                caption: "Bakery Shop somewhere in Spain",
                withBorder: false
            }
        },

        {
            type: "paragraph",
            data: {
                text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."
            }
        },

        {
            type: "list",
            data: {
                items: [
                    "It is a block-style editor",
                    "It returns clean data output in JSON",
                    "Designed to be extendable and pluggable with a simple API"
                ],
                style: "unordered"
            }
        },

        {
            type: "paragraph",
            data: {
                text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."
            }
        }]
    }





];

console.log(NoteData[0].blocks);

export default NoteData;
