using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Database.DbModels
{
    [Table("dbo.Game")]
    public class GameDbModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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

        [ForeignKey("UserId")]
        public virtual UserDbModel User { get; set; }
    }
}
