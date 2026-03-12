# Mongoose Virtuals

- Virtuals are computed properties in Mongoose documents, not stored in MongoDB.
- Common use: derive fullName from firstName + lastName.
- Mongoose adds an id virtual by default (string version of \_id).

## Creating Virtuals

We can create virtuals in multiple ways:

#### 1. Add `virtuals` property in Schema configuration.

```js
{
    strict: 'throw',
    timestamps: true,
    virtuals: {
      isAdult: {
        get() {
          return this.age >= 18;
        },
      }
    }
}
```

- Here `isAdult` is a virtual property

* We can also set the value of properties using setters

```js
 hobbiesString: {
        get() {
          return this.hobbies.join(', ');
        },
        set(value) {
          this.hobbies = [...this.hobbies, ...value.split(', ')];
        },
      },
```

#### 2. Directly Using schema.virtual()

### Getter only

```js
schema.virtual('fullName').get(() => ...)
```

### Getter + Setter

```js
schema.virtual('fullName').get(() => ...).set(val => ...)
```

#### 3. using alias

- If we add `alias` on any property, it also becomes a virtual.

```js
name: {
type: String,
required: [true, 'name field is required. Please enter the name.'],
minLength: 3,
trim: true,
alias: 'naam',
},
```

- Here `naam` is a virtual.

## Accessing Virtuals

We can directly access a virtual with a document.

```js
const user = await User.findOne({ email: 'danish@abc.com' });
console.log(user.isAdult;)
```

#### Enable in output

- If we are using .toJSON() or .toObject() we need enable them.

```js
doc.toJSON({ virtuals: true });
doc.toObject({ virtuals: true });
```

- To check all virtuals

```js
doc.schema.virtuals;
```

Virtuals & .lean()

    -> By default, virtuals do not work with .lean().
    -> To include them:
    Model.find().lean({ virtuals: true })
