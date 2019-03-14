import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ChartModel } from '../_interfaces/chartmodel.model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  /*
  *  we create the data array which will hold the data fetched from the server and will provide a data source for the chart.
  */
  public data: ChartModel[];
  public bradcastedData: ChartModel[];

  private hubConnection: signalR.HubConnection;

  /*
  * we build and start our connection as well as logging the message in the console.
  */
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/chart')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  /*
  * we have the addTransferChartDataListener function in which we subscribe to the event transferchardata
  * and accept the data from the server with the data parameter.
  * If we take a look at the Get action in the ChartController file,
  * we are going to see that we broadcast the data on the same transferchartdata event:
  * (_hub.Clients.All.SendAsync("transferchartdata", DataManager.GetData())).
  * those must match
  */
  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data) => {
      this.data = data;
      console.log(data);
    });
  }

  /*
  * this will send data to our Hub endpoint
  */
  public broadcastChartData = () => {
    this.hubConnection.invoke('broadcastchartdata', this.data)
    .catch(err => console.error(err));
  }

  /*
  * this will listen on the braodcastchartdata event.
  */
  public addBroadcastChartDataListener = () => {
    this.hubConnection.on('broadcastchartdata', (data) => {
      this.bradcastedData = data;
    });
  }
}
