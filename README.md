## Legacy Banking's Authentication & Authorization microservices

# Project
This source code comprises the authentication architecure for legacy backend. When containerized, this node will connect to every network overlay to allow for authenticaiton of end point interactions within our enterpise. This node can be added to more microservices for A&A services in the future.

# Purpose
Create a centralized node for handling authentication and authorization of personal that will have access to end points within the enterpise. 

## Source code used
- JavaScript (es6+)
- Node.JS framework

## Database used
- Non-relational database: Redis caching
- The source code will connect to a node that will act as our poin of caching for items that are frequently accessed.

## Cloud Infrastructure
- Amazon EC2 service: Use to host this source in the cloud in combination with Dockerization.
- Dockerization (Containerization)

## End goal
- Create a main entry point for A&A procedures for the enterprise that is hosted in the cloud using Amazon AWS EC2 instance. The instance will connect to the Swarm orchrestration where it can be scaled horizontally when the time is needed. 
