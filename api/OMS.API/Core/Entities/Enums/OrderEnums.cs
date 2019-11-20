namespace OMS.API.Core.Entities.Enums
{
    public class OrderEnums
    {
        public enum Status
        {
            WaitingForConfirmation = 1,
            WaitingForShipping = 2,
            Received = 3,
            Canceled = 4,
            Refused = 5
        }
    }
}
