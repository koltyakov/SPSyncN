using System;
using SPAuthN;

namespace SPSyncN.Tests
{
    public class Helpers
    {
        public static Options GetAuthOptions()
        {
            string SiteUrl = Environment.GetEnvironmentVariable("SPAUTH_SITEURL");
            string Username = Environment.GetEnvironmentVariable("SPAUTH_USERNAME");
            string Password = Environment.GetEnvironmentVariable("SPAUTH_PASSWORD");

            return SPAuth.GetAuth($@"--authOptions.siteUrl='{SiteUrl}' --authOptions.username='{Username}' --authOptions.password='{Password}' --saveConfigOnDisk=false");
        }
    }
}
