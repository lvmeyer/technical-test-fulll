# Vehicle fleet

## Setup

```
yarn install
```

## Play with CLI

Create a new Fleet for the given user. Prints out the fleetId

```
./src/cli.js create user-1
```

Register a vehicle into the fleet

```
./src/cli.js register-vehicle <fleetId> <vehiclePlateNumber>
```

#### Run the tests from commit previous db integration

```
git checkout 59597d09564acff2f351bf7b67e06bffb1f6dcf1
```

```
  yarn test
```
