# Rupiah Decomposition

Simple application that given a number of rupiahs will calculate the minimum number of rupiahs needed to make that amount

Example input

- 15000 = 1 x Rp10000, 1x Rp5000
- Rp3900 = 1x Rp2000, 1x Rp1000, 1x Rp500, 4x Rp100
- 12510 = 1 x Rp10000, 1x Rp2000, 1x Rp500, left Rp10 (no - available fraction)

Examples of valid inputs with their canonical equivalents 18.215 (18215), Rp17500 (17500), Rp17.500,00 (17500), Rp 120.325 (120325), 005.000 (5000), 001000 (1000)

Examples of invalid inputs: 17,500 (invalid separator),  2 500(invalid separator), 3000 Rp (valid character in wrong position), Rp (missing value)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

 - Install NodeJS for running `npm`
 - Clone or download this repository

### Installing

Go to the application directory and run `npm install`, below is command example when using linux or mac

```
$ cd rupiah-decomposition
$ nmp install
```

## Running the tests

To run the automated tests for this application go to application directory and run `npm test`, below is command example when using linux or mac

```
$ cd rupiah-decomposition
$ nmp test
```

## Running application in the browser

To run application in the browser go to application directory and run `npm start`, open url `http://localhost:3000/` in the browser

