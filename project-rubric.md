---

Title: Marking Rubric - Project
Authors: Neil Ernst

---

# Running Total (this will change each milestone):   41.5

NB: for all milestones, basic clean coding style: comments, standardized indentation, lack of code smells, is expected. Your submission and repository should show the following: 
	- Travis CI is being used (M3+)
	- a static analysis tool and linter has been applied (M3+)
	- Typescript project best practices are followed (M3+)

# Milestone 1    8 / 10

## Marking Guide	

- ASRs complete and capture
  - need to persist data
  - need to manage user state and cookies
  - security and privacy
  - usability
  - performance and latency
  - async issues

Marks deducted:

- scenarios seem to have little to no connection with the project (-2)
- poor technical writing  (-2)
- Quality of scenarios (clear analysis of stimulus, response, response measure)

## Notes M1

(explaining why marks were deducted)
-----

- use proper titles for user stories (-1)
- see comments online on NFRs (-1)

# Milestone 2    14 / 20

## Marking Guide

- design cohesive and intelligent
- design solves QAR from M1
- design models follow conventions for class and activity diagrams
- design allows for future changes
- design justifies technology choices

## Notes M2

(explaining why marks were deducted)

- Technical writing could be better. The document should be divided into sections to make it understandable. (-1)
  \- The Sequence diagram is incorrect. The flow is missing the important details. (-1)
  \- Sequence diagram does not follow convention and the object names should be more specific. (-1)
  \- ADR are not described at all in the design document. Class diagram and beahaviour diagram has been described as ADR which is not acceptable as ADRs. (-3)

-----

# Milestone 3    8/ 20

## Marking Guide	

- code conventions/CI from above
- working demo 
- clear explanation of what user stories were satisfied in this iteration
- design is visibly MVC or some justification of why not 
- async is async when necessary
- code compiles
- TSLint does not complain.

## Notes M3

(explaining why marks were deducted)

- User stories are implemented without the database. The data is read from JSON file which is not full implementation. (-1)
- Testing not done. (-2)
- Travis does not have code coverage, tests in it. (-1)
- Code is too complex. (-2)
- Comments are missing. (-1)
- Design not followed by the implementation. (-2)
- Async is not implemented. (-3)

# Milestone 3.5  4.5 / 5

## Marking Guide	
- code compiles 
- code conventions/CI from above (commented, code style, design principles)
- working demo 
- clear explanation of what (2) user stories were satisfied in this iteration
- design as implemented follows design doc, or change rationale is present in README
- async is async when necessary
- TSLint does not complain
- test suite present/part of CI
- test coverage reasonable and meaningful

## Notes M3.5
(explaining why marks were deducted)
- Code is complex, needs improvement. (-0.5)

-----

# Milestone 4    / 30

## Marking Guide	
- code compiles 
- code conventions/CI from above (commented, code style, design principles)
- working demo 
- clear explanation of how the remaining user stories were satisfied in this iteration
- design as implemented follows design doc, or change rationale is present in README
- async is async when necessary
- TSLint does not complain
- test suite present/part of CI
- test coverage reasonable and meaningful

And new in M4:
- **explanation of how you are automating testing 3 QAS from your list in M1** 
- **explanation of integration testing and CI pipeline**


## Notes M4
(explaining why marks were deducted)
-----

# Milestone 5  7 / 10

## Marking Guide
- demo works without error. -1 per bug or workaround.
- demo covers all user stories. Show us your user stories and make it clear what user story you are going through.
- demo has a coherent and organized demo script
- architectural summary is brief and coherent, explaining the key design problems.

## Notes M5
- Decent demo
- Fairly good functionality and everything working
- Seem to have the availability scenario sorted out
- could have made UI a bit more interesting
- lacks some energy to make app ambitious - e.g. live scraping shoe sites, adding images, etc.

# Milestone 6 / 5

## Marking Guide
- evidence of reflection and meaningful consideration of potential and actual problems.
- presentation and writing style appropriate for technical writing in software engineering.
- demonstrates understanding of design approach using Node/Express/Mongo.
