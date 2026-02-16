# ValidationAction vs validationLevel

These two control how MongoDB handles documents that fail validation.

1.  Validation Action

        -> What happens when a document fails validation?
        -> error (default): Reject the insert or update.
        -> warn: Allow the operation but log a warning.
        -> validationAction: "error" // or "warn"

2.  Validation Level

        -> Which documents are checked during validation?
        -> strict (default): Validate all inserts and updates.
        -> moderate: Validate only documents that already have the validated fields.
        -> off (MongoDB 7.0+): Disable validation.
        -> validationLevel: "strict" // or "moderate"
