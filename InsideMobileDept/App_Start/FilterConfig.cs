﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InsideMobileDept
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute() {
                View = "Error", Master = "Index"
            });
            filters.Add(new NoCacheGlobalActionFilter());
        }

        public class NoCacheGlobalActionFilter : ActionFilterAttribute
        {
            public override void OnResultExecuted(ResultExecutedContext filterContext)
            {
                HttpCachePolicyBase cache = filterContext.HttpContext.Response.Cache;
                cache.SetCacheability(HttpCacheability.NoCache);
                cache.SetNoStore();
                base.OnResultExecuted(filterContext);
            }
        }
    }
}