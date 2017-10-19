using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InsideMobileDept.Models
{
    public class ConnectionDatabase
    {
        private static string sqlConnection = "sqlConnectionWrite";

        public static string strSqlConetion { get { return sqlConnection; } set { sqlConnection = value; } }
    }
}