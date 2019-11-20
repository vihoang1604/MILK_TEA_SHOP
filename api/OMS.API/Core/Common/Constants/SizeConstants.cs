using System;

namespace OMS.API.Core.Common.Constants
{
    public class SizeConstants
    {
        private SizeConstants(Guid id, string name) { Id = id; Name = name; }

        public Guid Id { get; }

        public string Name { get; }

        public static SizeConstants Medium
        {
            get
            {
                return new SizeConstants(new Guid("4666E115-54E2-4A3C-93DB-9288ECB0CC7D"), "M");
            }
        }

        public static SizeConstants Large
        {
            get
            {
                return new SizeConstants(new Guid("641124B9-9028-47BF-8B41-EC7AF16F0F3A"), "L");
            }
        }
    }
}
