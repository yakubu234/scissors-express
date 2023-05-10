const express = require('express')

module.exports = (error, req, res, next) => {
    console.log("Error Handling Middleware called")
    console.log('Path: ', req.path)
    console.error('Error: ', error)

    switch (error.type) {
        case 'Redirect':
            res.redirect('error.html')
            break;
        case 'Not Found':
            res.status(404).send(error)
            break;
        case 'Invalid Number Supplied':
            res.status(401).json({
                "status": "error",
                "message": "Invalid Number Supplied",
                "data": {}
            })
            break;
        case 'Invallid Page':
            res.status(401).json({
                "status": "error",
                "message": "This page does not exist",
                "data": {}
            })
            break;
        case 'No Data':
            res.status(401).json({
                "status": "error",
                "message": "Record does not exist",
                "data": {}
            })
            break;
        case 'cors':
            res.status(401).json({
                "status": "error",
                "message": 'sorry your domain/request origin is not whitelisted',
                "data": {}
            })
            break;

        default:
            res.status(400).send(error)
            break;
    }

    next() // next is required to call next middleware if any
}