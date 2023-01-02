use ekatanalotis;
DELIMITER $
CREATE TRIGGER lOffers AFTER INSERT ON userlikes
FOR EACH ROW
BEGIN
IF (NEW.actionl='LIKE') THEN
UPDATE offer SET likes=likes+1 WHERE offer_id=NEW.liked_offer;
ELSE
UPDATE offer SET dislikes=dislikes+1 WHERE offer_id=NEW.liked_offer;
END IF;
END $
DELIMITER ;