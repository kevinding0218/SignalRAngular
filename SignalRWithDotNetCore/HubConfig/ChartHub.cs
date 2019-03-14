using Microsoft.AspNetCore.SignalR;
using SignalRWithDotNetCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRWithDotNetCore.HubConfig
{
    public class ChartHub : Hub
    {
        /*
         * Because we are starting the SignalR communication from the client, we need a hub endpoint to Invoke our data to. 
         * This BroadcastChartData method will receive the message from the client 
         * and then broadcast that same message to all the clients that listen on the bradcastchratdata event.
         */
        public async Task BroadcastChartData(List<ChartModel> data) => await Clients.All.SendAsync("broadcastchartdata", data);
    }
}
