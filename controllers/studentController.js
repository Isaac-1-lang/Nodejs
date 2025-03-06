const express = require('express');
const router = express.Router();
const Joi = require('joi');
const debug = require('debug')('app:courses');
const config = require('config');
// In-memory course list
const courses = [
 { courseId: 1, name: 'Math 101', instructor: 'Dr. Smith', passMark: 50 },
 { courseId: 2, name: 'History 201', instructor: 'Prof. Jones', passMark: 60 },
];