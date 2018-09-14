using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace apiRouter.Controllers
{
    public class ApiController : Controller
    {
        public JsonResult Index(string postUrl, string paramData, string ContentType, string usertoken)
        {
            string ret = string.Empty;
            try
            {
                paramData = paramData.Replace("|", "&");
                string reqUrl = string.Format("{0}?usertoken={1}&{2}", postUrl, usertoken, paramData);
                if (!postUrl.StartsWith("http"))
                    return Json(ret, JsonRequestBehavior.AllowGet);

                HttpWebRequest webReq = (HttpWebRequest)WebRequest.Create(new Uri(reqUrl));
                webReq.Method = "POST";
                if (string.IsNullOrEmpty(ContentType))
                {
                    ContentType = "application/json";
                }
                webReq.ContentType = ContentType;

                webReq.Headers.Add("deviceNo", "webapp");
                webReq.Headers.Add("application", "webapp");
                //webReq.Headers.Add("userToken", usertoken);

                Stream newStream = webReq.GetRequestStream();
                newStream.Close();
                HttpWebResponse response = (HttpWebResponse)webReq.GetResponse();
                StreamReader sr = new StreamReader(response.GetResponseStream(), Encoding.UTF8);
                ret = sr.ReadToEnd();
                sr.Close();
                response.Close();
                newStream.Close();
            }
            catch (Exception ex)
            {
                return Json(ret, JsonRequestBehavior.AllowGet);
            }
            Response.ContentType = "application/json";
            Response.AddHeader("Access-Control-Allow-Origin", "*");
            Response.AddHeader("Access-Control-Allow-Methods", "POST,GET");
            JavaScriptSerializer js = new JavaScriptSerializer();
            object jsObj = js.Deserialize<object>(ret);
            return Json(jsObj, JsonRequestBehavior.AllowGet);
        }

    }
}
