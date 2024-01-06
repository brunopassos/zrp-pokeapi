interface BaseErrorProps {
    message: string
    statusCode: number
    errorLocationCode: string
}

export class BaseError extends Error {
    public statusCode: number
    public errorLocationCode: string
  
    constructor(props: BaseErrorProps) {
      super(props.message)
      this.statusCode = props.statusCode
      this.errorLocationCode = props.errorLocationCode
    }
}

export class NotFoundError extends BaseError {
    constructor(props: BaseErrorProps) {
      super({
        message: props.message,
        statusCode: props.statusCode,
        errorLocationCode: props.errorLocationCode,
      })
    }
}