using System;

namespace OMS.Api.Core.Common.Constants
{
    public class RoleConstants
    {
        public const string SA = "075c1072-92a2-4f99-ac11-bf985b23da6e";

        public const string CU = "0E3F8FDA-F42A-414A-943A-3E21C02031B2";

        public static Guid SuperAdminId = new Guid(SA);

        public static Guid CustomerId = new Guid(CU);

        public const string AllRole = SA;
    }
}