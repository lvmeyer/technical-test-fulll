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
git checkout c9b89c409665403d72f4f1092d18e8eb8f8a7c04
```

```
  yarn test
```
