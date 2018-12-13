using System;

namespace Services.Models.Game
{
    public class GameModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int NumberOfL { get; set; }
        public int NumberOfJ { get; set; }
        public int NumberOfO { get; set; }
        public int NumberOfE { get; set; }
        public int NumberOfI { get; set; }
        public int NumberOfZ { get; set; }
        public int NumberOfS { get; set; }
        public int Point { get; set; }
        public DateTime DateTime { get; set; }
    }
}
