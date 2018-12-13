using System;

namespace Services.Models.Game
{
    public class GameForListModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public int Point { get; set; }
        public DateTime DateTime { get; set; }
    }
}
