using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SignalRWithDotNetCore.TimerFeatures
{
    public class TimerManager
    {
        private Timer _timer;
        private AutoResetEvent _autoResetEvent;
        private Action _action;

        public DateTime TimerStarted { get; }

        public TimerManager(Action action)
        {
            _action = action;
            _autoResetEvent = new AutoResetEvent(false);
            /*
             * We are using an Action delegate to execute passed callback function every two seconds. 
             * The timer will make a one-second pause before first execution.
             */
            _timer = new Timer(Execute, _autoResetEvent, 1000, 2000);
            TimerStarted = DateTime.Now;
        }

        public void Execute(object stateInfo)
        {
            _action();

            /* 
             * we just create a sixty seconds time slot for execution, to avoid limitless timer loop.
             */
            if ((DateTime.Now - TimerStarted).Seconds > 60)
            {
                _timer.Dispose();
            }
        }
    }
}
