const express = require("express");
var mysql = require('../../config/dbcon.js');

const courseHelpers = require('../helpers/course');
const renderCoursePage = courseHelpers.renderCoursePage;

const router = express.Router();

/* ROUTES */

router.post("/add", function(req, res) {
    const { title, url, votes, courseId } = req.body;
    mysql.pool.query(`INSERT INTO books (title, url, votes, courseId) VALUES (?, ?, ?, ?)`, [title, url, votes, courseId], 
        function(err, rows){
            if(err){
                console.error(err);
                return;
            }
            renderCoursePage(courseId, res);
        }
    );
});

router.post("/upvote", function(req, res) {
    const { bookId, courseId } = req.body;
    mysql.pool.query(`UPDATE books SET votes = votes + 1 WHERE id = ?`, [bookId], 
        function(err, rows){
            if(err){
                console.error(err);
                return;
            }
            renderCoursePage(courseId, res);
        }
    );
});

router.post("/downvote", function(req, res) {
    const { bookId, courseId } = req.body;
    mysql.pool.query(`UPDATE books SET votes = votes - 1 WHERE id = ?`, [bookId], 
        function(err, rows){
            if(err){
                console.error(err);
                return;
            }
            renderCoursePage(courseId, res);
        }
    );
});

module.exports = router;