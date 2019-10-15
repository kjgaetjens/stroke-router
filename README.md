# Stroke Router

Brief
------

Stroke Router is an EMS routing application that allows EMS professionals to input stroke assessment information, receive assessment results, and view hospital and routing information for hospitals that fit the assessment result criteria.

When responding to stroke patients, EMS professionals conduct a series of assessments. Stroke Router does not require any additional assessments. Instead, EMS professionals can easily and quickly enter information they are already collecting. Our application makes two major determinations: tPA exclusion and large vessel occlusion. These determinations dictate which hospitals a patient should be routed to. Stroke Router provides the user with a list of these hospitals, along with additional information including hospital classification, distance to, and time to. Stroke Router is a complete end-to-end application that starts with an EMS professional inputting stroke assessment information, and ends with them sending a pre-notification to the hospital they choose and the google maps app opening with directions to the hospital.

View Demo:
[![Watch the video](strokeroutervimeo.jpg)](https://vimeo.com/366522055)


Concept 
------ 

Until recently, standard protocol for transporting stroke patients was to bring them directly to the nearest emergency department. In recent years, however, a new protocol involving early identification and transfer of patients with high-severity stroke symptoms to a Comprehensive Stroke Center has demonstrated great success. The protocol involves diverting patients based on the outcome of a pre-hospital triage tool (such as the RACE assessment), instead of indiscriminately transporting them to the nearest emergency department. It has resulted in increased treatment rates, improved time efficiency, and improved outcomes.

Stroke Router is a Progressive Web Application for the healthcare industry that helps EMS professionals determine when and where to divert stroke patients. Stroke Router prepares a triage report for the patient, recording answers to questions pertaining to tPA exclusion criteria, and then the RACE Scale triage tool to determine probability of a Large-Vessel Occlusion. Based on the outcomes to these two assessments, the app will find all nearby hospitals and provide distance and travel time information for each. In the case of more serious strokes, the app is able to filter hospitals by ASA Stroke Cerification, and recommend transport to a center with more intensive treatment methods.


Technologies 
------ 

Stroke Router is a mobile Progressive Web Application. Stroke Router's core functionality, it's ability to make a stroke diversion determination and route EMS to appropriate hospitals, is made possible by combining a stroke assessment algorithm with Google Maps APIs and React.js.

* HTML
* CSS
* React.js
* Redux
* JavaScript
* Node.js
* Express.js
* REST API
* MongoDB
* Mongoose
* Bcrypt


Team
------

* [Kelsey Gaetjens](https://github.com/kjgaetjens/)
* [Eric Snover](https://github.com/ersnover/)
