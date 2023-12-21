## Experiences:

- isDirty will compare fieldValue to defaultValue, so deafultValue is good practice in Form Hook
- check the condition (!isDirty || isSubmitting) and make it disable while submitting the form
- ZodValidation and Hook Validation both doesn't work same time
- We can pass event in Form Hook in register method to run our custom event
