using System.Web;
using System.Web.Optimization;

namespace InsideMobileDept
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                       "~/Scripts/bootstrap.min.js",
                       "~/Scripts/respond.js",
                       "~/Scripts/site.js",
                       "~/Scripts/smooth-scroll/smooth-scroll.js",
                       "~/Scripts/touch-swipe/jquery.touch-swipe.min.js",
                       "~/Scripts/kendo/jquery.min.js",
                       "~/Scripts/kendo/kendo.all.min.js",
                       "~/Scripts/gridmvc.min.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                        "~/Content/css/styles.css",
                        "~/Content/css/bootstrap.min.css",
                        "~/Content/kendo/kendo.common.min.css",
                        "~/Content/kendo/kendo.mobile.all.min.css",
                        "~/Content/kendo/kendo.bootstrap.min.css",
                        "~/Content/kendo/kendo.bootstrap.mobile.min.css",
                        "~/Content/css/Gridmvc.css"));

            // Jquery UI
            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));
        }
    }
}
