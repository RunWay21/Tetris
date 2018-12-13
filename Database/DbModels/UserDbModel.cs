using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Database.DbModels
{
    [Table("dbo.User")]
    public class UserDbModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Login { get; set; }
        
        public string Password { get; set; }

        public DateTime? LastLoginDate { get; set; }

        public DateTime Created { get; set; }
    }
}
