var Ticket = require('./models/ticket');

function getTickets(res) {
    Ticket.find(function (err, tickets) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(tickets); // return all tickets in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all tickets
    app.get('/api/tickets', function (req, res) {
        // use mongoose to get all tickets in the database
        getTickets(res);
    });

    // create ticket and send back all tickets after creation
    app.post('/api/tickets', function (req, res) {

        // create a ticket, information comes from AJAX request from Angular
        Ticket.create({
            text: req.body.text,
            name: req.body.name,
            date: req.body.date,
            done: false
        }, function (err, ticket) {
            if (err)
                res.send(err);

            // get and return all the tickets after you create another
            getTickets(res);
        });

    });

    // delete a ticket
    app.delete('/api/tickets/:ticket_id', function (req, res) {
        Ticket.remove({
            _id: req.params.ticket_id
        }, function (err, ticket) {
            if (err)
                res.send(err);

            getTickets(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
