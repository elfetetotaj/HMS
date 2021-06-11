namespace Application.Core
{
    public class Result<T>
    {
        public bool IsSuccess {get; set;}
        public T Value { get; set; }
        public string Error { get; set; }
        public static Result<T> Succsess(T value) => new Result<T>{IsSuccess = true, Value = value};
        public static Result<T> Failture (string error) => new Result<T>{IsSuccess = false, Error = error};
    }
}